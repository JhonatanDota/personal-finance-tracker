<?php

namespace Tests\Feature\Transaction;

use Tests\TestCase;

use App\Models\Category;
use App\Models\Transaction;

class DeleteTransactionTest extends TestCase
{
    public function testDeleteTransactionNotLogged()
    {
        $transaction = Transaction::factory()->create();

        $response = $this->json('DELETE', 'api/transactions/ ' . $transaction->id);

        $response->assertUnauthorized();
    }

    public function testeTryDeleteUnknownTransaction()
    {
        $this->actingAs($this->user);

        $unknownTransactionId = Transaction::max('id') + 1;

        $response = $this->json('DELETE', 'api/transactions/' . $unknownTransactionId);

        $response->assertNotFound();
    }

    public function testTryRemoveTransactionFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->create();

        $response = $this->json('DELETE', 'api/transactions/' . $transaction->id);

        $response->assertForbidden();
    }

    public function testDeleteTransactionSuccessfully()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id
        ]);

        $response = $this->json('DELETE', 'api/transactions/' . $transaction->id);

        $response->assertNoContent();

        $this->assertDatabaseMissing(Transaction::class, [
            'id' => $transaction->id
        ]);
    }
}
