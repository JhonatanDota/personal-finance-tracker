<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

use App\Http\Filters\TransactionFilter;

use App\Models\User;
use App\Models\Transaction;

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
        return $user->transactions()->with('category')->filter($filter)->paginate(10);
    }

    /**
     * Create a new transaction.
     *
     * @param array $data
     *
     * @return Transaction
     */
    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }
}
