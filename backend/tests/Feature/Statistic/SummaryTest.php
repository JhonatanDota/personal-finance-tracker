<?php

namespace Tests\Feature\Statistic;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

use App\Enums\CategoryTypesEnum;

class SummaryTest extends TestCase
{
    public function testTryAccessSummaryRouteNotLoggedTest()
    {
        $response = $this->json('GET', 'api/statistics/summary');

        $response->assertUnauthorized();
    }

    public function testGetSummaryWithoutTransacions()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/statistics/summary');

        $response->assertOk();

        $response->assertExactJson([
            CategoryTypesEnum::EXPENSE->value => [
                'count' => 0,
                'total' => 0,
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => 0,
                'total' => 0,
            ]
        ]);
    }

    public function testGetSummaryWithTransactions()
    {
        // Create some random transactions from another users
        Transaction::factory(10)->create();

        $this->actingAs($this->user);

        Category::factory(5)->for($this->user)->has(Transaction::factory(5))->create();

        $response = $this->json('GET', 'api/statistics/summary');

        $response->assertOk();

        $response->assertExactJson([
            CategoryTypesEnum::EXPENSE->value => [
                'count' => $this->user->expenseTransactions()->count(),
                'total' => (float) $this->user->expenseTransactions()->sum('value'),
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => $this->user->incomeTransactions()->count(),
                'total' => (float) $this->user->incomeTransactions()->sum('value'),
            ],
        ]);

        $this->assertGreaterThan($this->user->transactions()->count(), Transaction::count());
        $this->assertGreaterThan($this->user->transactions()->sum('value'), Transaction::sum('value'));
    }

    public function testTryFilterWithInvalidDate()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/statistics/summary', [
            'date_ge' => 'invalid-date',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'date_ge' => ['O campo date_ge deve ser uma data.'],
        ]);

        $response = $this->json('GET', 'api/statistics/summary', [
            'date_le' => 'invalid-date',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'date_le' => ['O campo date_le deve ser uma data.'],
        ]);
    }

    public function testGetSummaryWithDateFilter()
    {
        $this->actingAs($this->user);

        $filterDate = '2020-01-01';

        Category::factory(3)->for($this->user)
            ->has(Transaction::factory(3)->beforeDate($filterDate))
            ->has(Transaction::factory(3)->afterDate($filterDate))
            ->has(Transaction::factory(2, ['date' => $filterDate]))
            ->create();

        $this->assertGreaterThan(0, $this->user->transactions()->whereDate('date', '<=', $filterDate)->count());
        $this->assertGreaterThan(0, $this->user->transactions()->whereDate('date', '>=', $filterDate)->count());
        $this->assertGreaterThan(0, $this->user->transactions()->whereDate('date', '=', $filterDate)->count());

        // Test filter date greater than

        $response = $this->json('GET', 'api/statistics/summary', [
            'date_ge' => $filterDate,
        ]);

        $expenseQuery = $this->user->expenseTransactions()->whereDate('date', '>=', $filterDate);
        $incomeQuery = $this->user->incomeTransactions()->whereDate('date', '>=', $filterDate);

        $response->assertExactJson([
            CategoryTypesEnum::EXPENSE->value => [
                'count' => $expenseQuery->count(),
                'total' => (float) $expenseQuery->sum('value'),
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => $incomeQuery->count(),
                'total' => (float) $incomeQuery->sum('value'),
            ],
        ]);

        // Test filter date less than

        $response = $this->json('GET', 'api/statistics/summary', [
            'date_le' => $filterDate,
        ]);

        $expenseQuery = $this->user->expenseTransactions()->whereDate('date', '<=', $filterDate);
        $incomeQuery = $this->user->incomeTransactions()->whereDate('date', '<=', $filterDate);

        $response->assertExactJson([
            CategoryTypesEnum::EXPENSE->value => [
                'count' => $expenseQuery->count(),
                'total' => (float) $expenseQuery->sum('value'),
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => $incomeQuery->count(),
                'total' => (float) $incomeQuery->sum('value'),
            ],
        ]);

        // Test filter date between

        $response = $this->json('GET', 'api/statistics/summary', [
            'date_ge' => $filterDate,
            'date_le' => $filterDate,
        ]);

        $expenseQuery = $this->user->expenseTransactions()->whereBetween('date', [$filterDate, $filterDate]);
        $incomeQuery = $this->user->incomeTransactions()->whereBetween('date', [$filterDate, $filterDate]);

        $response->assertExactJson([
            CategoryTypesEnum::EXPENSE->value => [
                'count' => $expenseQuery->count(),
                'total' => (float) $expenseQuery->sum('value'),
            ],

            CategoryTypesEnum::INCOME->value => [
                'count' => $incomeQuery->count(),
                'total' => (float) $incomeQuery->sum('value'),
            ]
        ]);
    }
}
