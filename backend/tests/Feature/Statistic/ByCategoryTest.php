<?php

namespace Tests\Feature\Statistic;

use Tests\TestCase;

use Illuminate\Support\Carbon;

use App\Models\Category;
use App\Models\Transaction;

class ByCategoryTest extends TestCase
{
    public function testTryAccessByCategoryRouteNotLoggedTest()
    {
        $response = $this->json('GET', 'api/statistics/by-category');

        $response->assertUnauthorized();
    }

    public function testByCategoryWithoutTransactions()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/statistics/by-category');

        $response->assertOk();

        $response->assertExactJson([]);
    }

    public function testCategoriesWithoutTransactionsDoNotAppear()
    {
        $this->actingAs($this->user);

        Category::factory()->for($this->user)->create();

        $response = $this->json('GET', 'api/statistics/by-category');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function testTransactionsFromOtherUsersAreIgnored()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->has(Transaction::factory(count: 2, state: ['value' => 55.50]))->for($this->user)->create(['name' => 'OnlyMine']);

        // Create some random transactions from another users
        Category::factory(count: 2)->has(Transaction::factory(state: ['value' => 999]))->create();
        Category::factory(count: 3)->has(Transaction::factory(state: ['value' => 10]))->create();

        $response = $this->json('GET', 'api/statistics/by-category');

        $response->assertOk();
        $response->assertExactJson([
            [
                'id' => $category->id,
                'type' => $category->type,
                'name' => 'OnlyMine',
                'count' => 2,
                'total' => 111,
            ],
        ]);
    }

    public function testFilterByDateGe()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create(['name' => 'Filtered']);

        Transaction::factory()->for($category)->create([
            'value' => 10,
            'date' => Carbon::parse('2024-01-01'),
        ]);

        Transaction::factory()->for($category)->create([
            'value' => 20,
            'date' => Carbon::parse('2024-02-01'),
        ]);

        $response = $this->json('GET', 'api/statistics/by-category', [
            'date_ge' => '2024-02-01'
        ]);

        $response->assertOk();
        $response->assertExactJson([
            [
                'id' => $category->id,
                'type' => $category->type,
                'name' => 'Filtered',
                'count' => 1,
                'total' => 20.0,
            ],
        ]);
    }

    public function testFilterByDateLe()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create(['name' => 'Filtered']);

        Transaction::factory()->for($category)->create([
            'value' => 10,
            'date' => Carbon::parse('2024-01-01'),
        ]);

        Transaction::factory()->for($category)->create([
            'value' => 20,
            'date' => Carbon::parse('2024-02-02'),
        ]);

        $response = $this->json('GET', 'api/statistics/by-category', [
            'date_le' => '2024-02-01'
        ]);

        $response->assertOk();
        $response->assertExactJson([
            [
                'id' => $category->id,
                'type' => $category->type,
                'name' => 'Filtered',
                'count' => 1,
                'total' => 10.0,
            ],
        ]);
    }

    public function testFilterByDateGeAndDateLe()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create(['name' => 'Range']);

        Transaction::factory()->for($category)->create([
            'value' => 10,
            'date' => Carbon::parse('2024-01-01'),
        ]);

        Transaction::factory()->for($category)->create([
            'value' => 20,
            'date' => Carbon::parse('2024-02-01'),
        ]);

        Transaction::factory()->for($category)->create([
            'value' => 30,
            'date' => Carbon::parse('2024-03-01'),
        ]);

        $response = $this->json('GET', 'api/statistics/by-category', [
            'date_ge' => '2024-01-01',
            'date_le' => '2024-02-15'
        ]);

        $response->assertOk();
        $response->assertExactJson([
            [
                'id' => $category->id,
                'type' => $category->type,
                'name' => 'Range',
                'count' => 2,
                'total' => 30.0,
            ],
        ]);
    }
}
