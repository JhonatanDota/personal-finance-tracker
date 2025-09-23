<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;

use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Category $category
     * @return bool
     */
    public function update(User $user, Category $category): bool
    {
        return $user->id == $category->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Category $category
     * @return bool
     */
    public function delete(User $user, Category $category): bool
    {
        return $user->id == $category->user_id;
    }
}
