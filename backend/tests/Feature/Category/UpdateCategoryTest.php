<?php

namespace Tests\Feature\Category;

use Tests\TestCase;

use Illuminate\Support\Str;

use App\Enums\CategoriesEnum;

use App\Models\User;
use App\Models\Category;

class UpdateCategoryTest extends TestCase
{
    public function testTryUpdateCategoryNotLogged()
    {
        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertUnauthorized();
    }

    public function testTryUpdateUnknownCategory()
    {
        $this->actingAs($this->user);

        $response = $this->json('PATCH', 'api/categories/0');

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

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id);

        $response->assertOk();
    }

    public function testTryUpdateCategoryWithEmptyName()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => '',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testTryUpdateWithNameTooLong()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => Str::random(Category::NAME_MAX_LENGTH + 1),
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ter no máximo ' . Category::NAME_MAX_LENGTH .  ' caracteres.'],
        ]);
    }

    public function testTryUpdateWithNameNotString()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => 100,
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'name' => ['O campo name deve ser uma string.'],
        ]);
    }

    public function testUserIdCannotBeUpdated()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'user_id' => User::factory()->create()->id,
        ]);

        $response->assertOk();

        $response->assertJsonFragment([
            'id' => $category->id,
            'user_id' => $this->user->id,
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'user_id' => $this->user->id,
        ]);
    }

    public function testUpdateNameSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $data = [
            'name' => 'New Category Name',
        ];

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'name' => $data['name'],
        ]);

        $response->assertOk();

        $response->assertJsonStructure([
            'id',
            'user_id',
            'name',
            'type',
        ]);

        $response->assertExactJson([
            'id' => $category->id,
            'user_id' => $category->user_id,
            'name' => $data['name'],
            'type' => $category->type,
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'name' => $data['name'],
        ]);
    }

    public function testTryUpdateTypeWithInvalidType()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'type' => 'invalid_type',
        ]);

        $response->assertUnprocessable();

        $response->assertJsonFragment([
            'type' => ['O campo type deve conter um valor válido.'],
        ]);
    }

    public function testUpdateTypeSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id,
            'type' => CategoriesEnum::INCOME
        ]);

        $response = $this->json('PATCH', 'api/categories/' . $category->id, [
            'type' => CategoriesEnum::EXPENSE,
        ]);

        $response->assertOk();

        $response->assertJsonFragment([
            'id' => $category->id,
            'type' => CategoriesEnum::EXPENSE,
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'type' => CategoriesEnum::EXPENSE,
        ]);
    }

    public function testUpdateAllFieldsSuccessfully()
    {
        $this->actingAs($this->user);

        $category = Category::factory()->create([
            'user_id' => $this->user->id,
            'type' => CategoriesEnum::INCOME,
            'name' => 'Old Name',
        ]);

        $data = [
            'name' => 'Updated Category Name',
            'type' => CategoriesEnum::EXPENSE,
        ];

        $response = $this->json('PATCH', 'api/categories/' . $category->id, $data);

        $response->assertOk();

        $response->assertExactJson([
            'id' => $category->id,
            'user_id' => $category->user_id,
            'name' => $data['name'],
            'type' => $data['type'],
        ]);

        $this->assertDatabaseHas(Category::class, [
            'id' => $category->id,
            'name' => $data['name'],
            'type' => $data['type'],
        ]);
    }
}
