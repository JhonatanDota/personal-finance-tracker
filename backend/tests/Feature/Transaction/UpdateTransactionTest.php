<?php

namespace Tests\Feature\Transaction;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Http\Resources\Transaction\TransactionResource;

use App\Models\Category;
use App\Models\Transaction;

class UpdateTransactionTest extends TestCase
{
    public function testTryUpdateTransactionNotLogged()
    {
        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertUnauthorized();
    }

    public function testTryUpdateUnknownTransaction()
    {
        $this->actingAs($this->user);

        $unknownTransactionId = Transaction::max('id') + 1;

        $response = $this->json('PATCH', 'api/categories/' . $unknownTransactionId);

        $response->assertNotFound();
    }

    public function testTryUpdateTransactionFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertForbidden();
    }

    public function testUpdateTransactionWithoutData()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id);

        $response->assertOk();
    }

    // =========================================================================
    // CATEGORY_ID
    // =========================================================================

    public function testTryUpdateCategoryIdWithNull()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => null
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithUnknownCategory()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => Category::max('id') + 1
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithStringValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => 'test'
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.'],
        ]);
    }

    public function testTryUpdateCategoryIdWithCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => Category::factory()->create()->id
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    public function testUpdateCategoryIdSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();
        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'category_id' => $transaction->category_id,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'category_id' => $category->id
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'category_id' => $category->id,
        ]);
    }

    // =========================================================================
    // NAME
    // =========================================================================

    public function testTryUpdateTransactionNameWithNull()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'name' => null
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => [
                'O campo name deve ser uma string',
                'O campo name deve ter no mínimo ' . Transaction::NAME_MIN_LENGTH . ' caracteres.'
            ],
        ]);
    }

    public function testTryUpdateTransactionNameWithNumericValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'name' => 10000
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => [
                'O campo name deve ser uma string',
            ],
        ]);
    }

    public function testTryUpdateTransactionNameWithTooShortString()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'name' => Str::random(Transaction::NAME_MIN_LENGTH - 1)
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => [
                'O campo name deve ter no mínimo ' . Transaction::NAME_MIN_LENGTH . ' caracteres.'
            ],
        ]);
    }

    public function testTryUpdateTransactionNameWithTooLongString()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'name' => Str::random(Transaction::NAME_MAX_LENGTH + 1)
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => [
                'O campo name deve ter no máximo ' . Transaction::NAME_MAX_LENGTH . ' caracteres.'
            ],
        ]);
    }

    public function testUpdateTransactionNameSuccessfully()
    {
        $this->actingAs($this->user);

        $oldName = Str::random(Transaction::NAME_MAX_LENGTH);
        $newName = Str::random(Transaction::NAME_MAX_LENGTH);

        $this->assertNotEquals($oldName, $newName);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create([
            'name' => $oldName
        ]);

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'name' => $oldName,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'name' => $newName
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'name' => $newName,
        ]);
    }

    // =========================================================================
    // VALUE
    // =========================================================================

    public function testTryUpdateTransactionValueWithNull()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'value' => null
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'value' => [
                'O campo value deve ser um número.'
            ],
        ]);
    }

    public function testTryUpdateValueWithString()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'value' => 'number'
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'value' => [
                'O campo value deve ser um número.'
            ],
        ]);
    }

    public function testTryUpdateValueWithTooSmallValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'value' => Transaction::VALUE_MIN - 1
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'value' => [
                'O campo value deve ter no mínimo ' . Transaction::VALUE_MIN . '.'
            ],
        ]);
    }

    public function testTryUpdateValueWithTooBigValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'value' => Transaction::VALUE_MAX + 1
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'value' => [
                'O campo value deve ter no máximo ' . Transaction::VALUE_MAX . '.'
            ],
        ]);
    }

    public function testUpdateValueSuccessfully()
    {
        $this->actingAs($this->user);

        $oldValue = rand(Transaction::VALUE_MIN, Transaction::VALUE_MAX);
        $newValue = rand(Transaction::VALUE_MIN, Transaction::VALUE_MAX);

        $this->assertNotEquals($oldValue, $newValue);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create([
            'value' => $oldValue
        ]);

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'value' => $oldValue,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'value' => $newValue
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'value' => $newValue,
        ]);
    }

    // =========================================================================
    // DESCRIPTION
    // =========================================================================

    public function testTryUpdateDescriptionWithNumericValue()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'description' => 999
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'description' => [
                'O campo description deve ser uma string.'
            ],
        ]);
    }

    public function testTryUpdateDescriptionWithTooLongString()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'description' => Str::random(Transaction::DESCRIPTION_MAX_LENGTH + 1)
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'description' => [
                'O campo description deve ter no máximo ' . Transaction::DESCRIPTION_MAX_LENGTH . ' caracteres.'
            ],
        ]);
    }

    public function testUpdateDescriptionWithNullSuccessfully()
    {
        $this->actingAs($this->user);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create();

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'description' => $transaction->description,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'description' => null
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'description' => null,
        ]);
    }

    public function testUpdateDescriptionSuccessfully()
    {
        $this->actingAs($this->user);

        $oldDescription = Str::random(Transaction::DESCRIPTION_MAX_LENGTH);
        $newDescription = Str::random(Transaction::DESCRIPTION_MAX_LENGTH);

        $this->assertNotEquals($oldDescription, $newDescription);

        $transaction = Transaction::factory()->for(Category::factory()->for($this->user))->create([
            'description' => $oldDescription
        ]);

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'description' => $oldDescription,
        ]);

        $response = $this->json('PATCH', 'api/transactions/' . $transaction->id, [
            'description' => $newDescription
        ]);

        $response->assertOk();
        $response->assertExactJson(TransactionResource::make(Transaction::find($transaction->id))->resolve());

        $this->assertDatabaseHas(Transaction::class, [
            'id' => $transaction->id,
            'description' => $newDescription,
        ]);
    }
}
