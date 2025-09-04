<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Category;

use App\Enums\CategoriesEnum;

class CreateCategoryTest extends TestCase
{
    private User $user;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function testTryCreateCategoryNotLogged()
    {
        $response = $this->json('POST', 'api/categories/');

        $response->assertUnauthorized();
    }

    public function testTryCreateCategoryWithoutName()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'type' => CategoriesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name',
        ]);

        $response->assertJsonFragment([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateCategoryWithEmptyName()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => '',
            'type' => CategoriesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateCategoryWithNameNotString()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => 10,
            'type' => CategoriesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name',
        ]);

        $response->assertJsonFragment([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryCreateCategoryWithNameTooLong()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => Str::random(Category::NAME_MAX_LENGTH + 1),
            'type' => CategoriesEnum::EXPENSE->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name',
        ]);

        $response->assertJsonFragment([
            'name' => ['O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.'],
        ]);
    }

    public function testTryCreateCategoryWithoutType()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => 'Name',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'type',
        ]);

        $response->assertJsonFragment([
            'type' => ['O campo type é obrigatório.'],
        ]);
    }

    public function testTryCreateCategoryWithInvalidType()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => 'Name',
            'type' => 'INVALID',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'type',
        ]);

        $response->assertJsonFragment([
            'type' => ['O campo type deve conter um valor válido'],
        ]);
    }

    public function testAssertUserIdIsOverwrittenByAuthenticatedUser()
    {
        /**
         * Even passing the user_id, it should be overwritten by the auth user 
         */

        $this->actingAs($this->user);

        $user = User::factory()->create();

        $response = $this->json('POST', 'api/categories/', [
            'user_id' => $user->id,
            'name' => 'Name',
            'type' => CategoriesEnum::INCOME->value,
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas(Category::class, [
            'user_id' => $this->user->id,
            'name' => 'Name',
            'type' => CategoriesEnum::INCOME->value,
        ]);
    }

    public function testCreateCategorySuccessfully()
    {
        $this->actingAs($this->user);

        $data = [
            'name' => $this->faker->name(),
            'type' => CategoriesEnum::EXPENSE->value,
        ];

        $response = $this->json('POST', 'api/categories/', $data);
        $responseData = $response->json();

        $response->assertCreated();

        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'type',
        ]);

        $response->assertExactJson([
            'id' => $responseData['id'],
            'user_id' => $this->user->id,
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $responseData['id'],
            'user_id' => $this->user->id,
            'name' => $data['name'],
            'type' => $data['type'],
        ]);
    }
}
