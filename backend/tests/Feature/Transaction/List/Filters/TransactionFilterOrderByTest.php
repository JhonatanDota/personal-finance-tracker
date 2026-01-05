<?php

namespace Tests\Feature\Transaction\List\Filters;

use App\Models\Category;
use Tests\TestCase;

use App\Models\Transaction;

class TransactionFilterOrderByTest extends TestCase
{
    public function testTryFilterOrderByWithInvalidValue()
    {
        $this->actingAs($this->user);

        $response = $this->json('GET', 'api/transactions', [
            'order_by' => 'unknown column',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'order_by' => ['O campo order_by deve conter um valor valido.'],
        ]);
    }

    public function testFilterOrderByForCreatedAtColumn()
    {
        $this->actingAs($this->user);

        Category::factory()->for($this->user)
            ->has(Transaction::factory(['created_at' => '2025-01-01 15:00:00']))
            ->has(Transaction::factory(['created_at' => '2025-01-01 12:00:00']))
            ->has(Transaction::factory(['created_at' => '2025-01-03 00:00:00']))
            ->create();

        // Assert can be ordered by create_at ASC

        $response = $this->json('GET', 'api/transactions', [
            'order_by' => 'created_at',
        ]);

        $response->assertOk();

        $extractedCreatedAtDates = array_map(function ($transaction) {
            return $transaction['created_at'];
        }, $response->json()['data']);

        $this->assertEquals([
            '2025-01-01 12:00:00',
            '2025-01-01 15:00:00',
            '2025-01-03 00:00:00',
        ], $extractedCreatedAtDates);

        // Assert can be ordered by create_at DESC

        $response = $this->json('GET', 'api/transactions', [
            'order_by' => '-created_at',
        ]);

        $response->assertOk();

        $extractedCreatedAtDates = array_map(function ($transaction) {
            return $transaction['created_at'];
        }, $response->json()['data']);

        $this->assertEquals([
            '2025-01-03 00:00:00',
            '2025-01-01 15:00:00',
            '2025-01-01 12:00:00',
        ], $extractedCreatedAtDates);
    }
}
