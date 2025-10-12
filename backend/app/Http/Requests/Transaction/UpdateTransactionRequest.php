<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Validation\Rule;

use App\Models\Category;
use App\Models\Transaction;

class UpdateTransactionRequest extends DefaultTransactionRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update', $this->route('transaction'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'category_id' => [
                'sometimes',
                'integer',
                Rule::exists(Category::class, 'id')->where(function ($query) {
                    $query->where('user_id', $this->user()->id);
                }),
            ],
            'name' => ['sometimes', 'string', 'min:' . Transaction::NAME_MIN_LENGTH, 'max:' . Transaction::NAME_MAX_LENGTH],
            'value' => ['sometimes', 'numeric', 'min:' . Transaction::VALUE_MIN, 'max:' . Transaction::VALUE_MAX],
            'description' => ['sometimes', 'nullable', 'string', 'max:' . Transaction::DESCRIPTION_MAX_LENGTH],
            'date' => ['sometimes', 'date'],
        ];
    }
}
