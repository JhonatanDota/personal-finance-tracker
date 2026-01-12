<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;

use App\Models\User;
use App\Models\Category;

use App\Http\Filters\CategoryFilter;

class CategoryRepository
{
    /**
     * Get categories by user.
     *
     * @param User $user
     * @param CategoryFilter $filter
     *
     * @return Collection
     */
    public function getFromUser(User $user, CategoryFilter $filter): Collection
    {
        return $user->categories()->filter($filter)->get();
    }

    /**
     * Create Category.
     *
     * @param array $data
     * @return Category
     */

    public function create(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Update Category.
     *
     * @param int $id
     * @param array $data
     * @return Category
     */
    public function update(Category $category, array $data): Category
    {
        $category->update($data);

        return $category->refresh();
    }
}
