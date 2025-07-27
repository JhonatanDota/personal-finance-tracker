<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Create User.
     *
     * @param array $inputs
     * @return User
     */

    public function create(array $data): User
    {
        return User::create($data);
    }
}
