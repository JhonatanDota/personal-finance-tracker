<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Enums\CategoryTypesEnum;

use App\Models\User;
use App\Models\Category;

use App\Http\Resources\Category\CategoryResource;

class UpdateCategoryTest extends TestCase
{
    public function testTryUpdateCategoryNotLogged()
    {
        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertUnauthorized();
    }

    public function testTryUpdateUnknownCategory()
    {
        $this->actingAs($this->user);

        $unknownCategoryId = Category::max('id') + 1;

        $response = $this->json('PATCH', 'api/categories/' . $unknownCategoryId);

        $response->assertNotFound();
    }

    public function testTryUpdateCategoryFromAnotherUser()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertForbidden();
    }

    public function testUpdateCategoryWithoutData()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertOk();
    }

    public function testTryUpdateCategoryWithEmptyName()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => '',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryUpdateWithNameTooLong()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => Str::random(Category::NAME_MAX_LENGTH + 1),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.'],
        ]);
    }

    public function testTryUpdateWithNameNotString()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => 100,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testUserIdCannotBeUpdated()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'user_id' => User::factory()->create()->id,
        ]);

        $response->assertOk();

        $response->assertExactJson(CategoryResource::make($category)->resolve());

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'user_id' => $this->user->id,
        ]);
    }

    public function testUpdateNameSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $data = [
            'name' => 'New Category Name',
        ];

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => $data['name'],
        ]);

        $response->assertOk();

        $response->assertExactJson(CategoryResource::make(Category::find($category->id))->resolve());

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'name' => $data['name'],
        ]);
    }

    public function testTryUpdateTypeWithInvalidType()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create();

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'type' => 'invalid_type',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonValidationErrors([
            'type' => ['O campo type deve conter um valor válido.'],
        ]);
    }

    public function testUpdateTypeSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create([
            'type' => CategoryTypesEnum::INCOME
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'type' => CategoryTypesEnum::EXPENSE,
        ]);

        $response->assertOk();

        $response->assertExactJson(CategoryResource::make(Category::find($category->id))->resolve());

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'type' => CategoryTypesEnum::EXPENSE,
        ]);
    }

    public function testUpdateAllFieldsSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->for($this->user)->create([
            'type' => CategoryTypesEnum::INCOME,
            'name' => 'Old Name',
        ]);

        $data = [
            'name' => 'Updated Category Name',
            'type' => CategoryTypesEnum::EXPENSE,
        ];

        $response = $this->json('PATCH', 'api/categories/' . $category->id, $data);

        $response->assertOk();

        $response->assertExactJson(CategoryResource::make(Category::find($category->id))->resolve());

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'name' => $data['name'],
            'type' => $data['type'],
        ]);
    }
}
