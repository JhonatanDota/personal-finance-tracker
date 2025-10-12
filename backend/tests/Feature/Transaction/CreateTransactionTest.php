<?php

namespace Tests\Feature\Transaction;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Http\Resources\Transaction\TransactionResource;

use App\Models\Category;
use App\Models\Transaction;

class CreateTransactionTest extends TestCase
{
    public function testTryCreateTransactionNotLogged()
    {
        $response = $this->json('POST', 'api/transactions/');

        $response->assertUnauthorized();
    }

    // =========================================================================
    // CATEGORY_ID
    // =========================================================================
    public function testTryCreateTransactionWithoutCategoryId()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/transactions/', [
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id é obrigatório.'],
        ]);
    }

    public function testTryCreateTransactionWithCategoryIdNotInteger()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => 'abc',
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O campo category_id deve ser um inteiro.'],
        ]);
    }

    public function testTryCreateTransactionWithInvalidCategoryId()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => 9999,
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    public function testTryCreateTransactionWithCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'category_id' => ['O valor informado para o campo category_id não existe.'],
        ]);
    }

    // =========================================================================
    // NAME
    // =========================================================================
    public function testTryCreateTransactionWithoutName()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateTransactionWithEmptyName()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => '',
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateTransactionWithNameNotString()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 123,
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryCreateTransactionWithNameTooShort()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => Str::random(Transaction::NAME_MIN_LENGTH - 1),
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ter no mínimo ' . Transaction::NAME_MIN_LENGTH . ' caracteres.'],
        ]);
    }

    public function testTryCreateTransactionWithNameTooLong()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => Str::random(Transaction::NAME_MAX_LENGTH + 1),
            'value' => 100,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ter no máximo ' . Transaction::NAME_MAX_LENGTH . ' caracteres.'],
        ]);
    }

    // =========================================================================
    // VALUE
    // =========================================================================
    public function testTryCreateTransactionWithoutValue()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'value' => ['O campo value é obrigatório.'],
        ]);
    }

    public function testTryCreateTransactionWithValueNotNumeric()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 'abc',
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'value' => ['O campo value deve ser um número.'],
        ]);
    }

    public function testTryCreateTransactionWithValueTooLow()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => Transaction::VALUE_MIN - 1,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'value' => ['O campo value deve ter no mínimo ' . Transaction::VALUE_MIN . '.'],
        ]);
    }

    public function testTryCreateTransactionWithValueTooHigh()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => Transaction::VALUE_MAX + 1,
            'description' => 'Teste',
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'value' => ['O campo value deve ter no máximo ' . Transaction::VALUE_MAX . '.'],
        ]);
    }

    // =========================================================================
    // DESCRIPTION
    // =========================================================================
    public function testCreateTransactionWithoutDescription()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'date' => now()->toDateString(),
        ]);

        $response->assertCreated();
    }

    public function testTryCreateTransactionWithDescriptionNotString()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'description' => 12345,
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'description' => ['O campo description deve ser uma string.'],
        ]);
    }

    public function testTryCreateTransactionWithDescriptionTooLong()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'description' => Str::random(Transaction::DESCRIPTION_MAX_LENGTH + 1),
            'date' => now()->toDateString(),
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'description' => ['O campo description deve ter no máximo ' . Transaction::DESCRIPTION_MAX_LENGTH . ' caracteres.'],
        ]);
    }

    // =========================================================================
    // DATE
    // =========================================================================
    public function testTryCreateTransactionWithoutDate()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'date' => ['O campo date é obrigatório.'],
        ]);
    }

    public function testTryCreateTransactionWithInvalidDate()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('POST', 'api/transactions/', [
            'category_id' => $category->id,
            'name' => 'Compra',
            'value' => 100,
            'description' => 'Teste',
            'date' => 'not-a-date',
        ]);

        $response->assertUnprocessable();
        $response->assertJsonValidationErrors([
            'date' => ['O campo date deve ser uma data.'],
        ]);
    }

    public function testCreateTransactionSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $data = [
            'category_id' => $category->id,
            'name' => 'Compra válida',
            'value' => 150.50,
            'description' => 'Descrição válida',
            'date' => now()->toDateString(),
        ];

        $response = $this->json('POST', 'api/transactions/', $data);
        $responseData = $response->json();

        $response->assertCreated();
        $response->assertExactJson(TransactionResource::make(Transaction::find($responseData['id']))->resolve());
        $response->assertJsonStructure([
            'id',
            'category_id',
            'name',
            'value',
            'description',
            'date',
        ]);

        $this->assertDatabaseHas(
            Transaction::class,
            array_merge(
                ['id' => $responseData['id']],
                $data
            )
        );
    }
}
