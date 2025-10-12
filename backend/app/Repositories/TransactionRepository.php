<?php

namespace App\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;

use App\Http\Filters\TransactionFilter;

use App\Models\User;
use App\Models\Transaction;

class TransactionRepository
{
    /**
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
     * @param array $data
     *
     * @return Transaction
     */
    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }

    /**
     * @param int $id
     * @param array $data
     * @return Transaction
     */
    public function update(Transaction $transaction, array $data): Transaction
    {
        $transaction->update($data);

        return $transaction->refresh();
    }
}
