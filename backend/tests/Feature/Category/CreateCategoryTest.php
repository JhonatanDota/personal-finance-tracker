<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Category;

use App\Enums\CategoryTypesEnum;

use App\Http\Resources\Category\CategoryResource;

class CreateCategoryTest extends TestCase
{
    public function testTryCreateCategoryNotLogged()
    {
        $response = $this->json('POST', 'api/categories/');

        $response->assertUnauthorized();
    }

    public function testTryCreateCategoryWithoutName()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'type' => CategoryTypesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateCategoryWithEmptyName()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => '',
            'type' => CategoryTypesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name é obrigatório.'],
        ]);
    }

    public function testTryCreateCategoryWithNameNotString()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => 10,
            'type' => CategoryTypesEnum::INCOME->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryCreateCategoryWithNameTooLong()
    {
        $this->actingAs($this->user);

        $response = $this->json('POST', 'api/categories/', [
            'name' => Str::random(Category::NAME_MAX_LENGTH + 1),
            'type' => CategoryTypesEnum::EXPENSE->value,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
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
            'type' => CategoryTypesEnum::INCOME->value,
        ]);

        $response->assertCreated();

        $this->assertDatabaseHas(Category::class, [
            'user_id' => $this->user->id,
            'name' => 'Name',
            'type' => CategoryTypesEnum::INCOME->value,
        ]);
    }

    public function testCreateCategorySuccessfully()
    {
        $this->actingAs($this->user);

        $data = [
            'name' => $this->faker->name(),
            'type' => CategoryTypesEnum::EXPENSE->value,
        ];

        $response = $this->json('POST', 'api/categories/', $data);
        $responseData = $response->json();

        $response->assertCreated();

        $response->assertExactJson(CategoryResource::make(Category::find($responseData['id']))->resolve());
        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'type',
        ]);

        $this->assertDatabaseHas(
            Category::class,
            array_merge(
                ['id' => $responseData['id']],
                $data
            )
        );
    }
}
