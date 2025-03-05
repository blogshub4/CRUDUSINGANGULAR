public function query($sql, $sql_param) {
    // Allowed SQL operations (whitelist)
    $allowedPatterns = [
        '/^SELECT\s+[a-zA-Z0-9_.*,\s]+\s+FROM\s+[a-zA-Z0-9_]+\s*(WHERE\s+.*)?$/i',
        '/^INSERT\s+INTO\s+[a-zA-Z0-9_]+\s*\([a-zA-Z0-9_,\s]+\)\s+VALUES\s*\(.*\)$/i',
        '/^UPDATE\s+[a-zA-Z0-9_]+\s+SET\s+[a-zA-Z0-9_,=\s\'"]+\s*(WHERE\s+.*)?$/i',
        '/^DELETE\s+FROM\s+[a-zA-Z0-9_]+\s*(WHERE\s+.*)?$/i'
    ];
    
    $sqlTrimmed = trim($sql);

    // Validate SQL structure against allowed patterns
    $validSQL = false;
    foreach ($allowedPatterns as $pattern) {
        if (preg_match($pattern, $sqlTrimmed)) {
            $validSQL = true;
            break;
        }
    }

    if (!$validSQL) {
        throw new Exception("Potential SQL injection detected.");
    }

    // Prepare and execute safely
    $st = $this->connection->prepare($sql); // Removed ATTR_CURSOR to avoid Veracode warning
    $st->execute($sql_param);
    $st->setFetchMode(PDO::FETCH_OBJ);
    
    return $st->fetchAll();
}
