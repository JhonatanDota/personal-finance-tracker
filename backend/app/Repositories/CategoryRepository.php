<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;

use App\Models\User;
use App\Models\Category;

class CategoryRepository
{
    /**
     * Get categories by user.
     *
     * @param User $user
     *
     * @return Collection
     */
    public function getFromUser(User $user): Collection
    {
        return $user->categories;
    }
}
