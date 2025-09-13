<?php

namespace Tests\Traits;

use Closure;
use Illuminate\Support\Facades\DB;

trait AssertsQueries
{
    /**
     * Assert that a given number of database queries are executed
     * during the execution of a callback.
     *
     * @param int $expected The expected number of queries.
     * @param Closure $callback The code to execute and measure queries for.
     *
     * @return void
     */
    public function assertDatabaseQueryCount(int $expected, Closure $callback): void
    {
        DB::flushQueryLog();
        DB::enableQueryLog();

        $callback();

        $queries = DB::getQueryLog();

        $this->assertCount(
            $expected,
            $queries,
            "Expected {$expected} queries, but " . count($queries) . " were executed."
        );
    }
}
