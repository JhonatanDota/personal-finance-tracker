<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

use App\Models\User;

use App\Http\Filters\TransactionFilter;

class TransactionRepository
{
    /**
     * Get transactions by user with pagination.
     *
     * @param User $user
     * @param TransactionFilter $filter
     *
     * @return LengthAwarePaginator
     */
    public function getFromUser(User $user, TransactionFilter $filter): LengthAwarePaginator
    {
        return $user->transactions()->with('category')->filter($filter)->paginate();
    }
}
