<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

use App\Enums\CategoryTypesEnum;

use App\Models\Transaction;

class TransactionFilterRequest extends FormRequest
{
    private const ORDER_BY_COLUMNS_OPTIONS = [
        'created_at',
        '-created_at',
    ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => ['sometimes', Rule::in(CategoryTypesEnum::values())],
            'category_id' => ['sometimes', 'nullable', 'integer'],
            'name' => ['sometimes', 'nullable', 'string', 'max:' . Transaction::NAME_MAX_LENGTH],
            'order_by' => ['sometimes', 'string', Rule::in(self::ORDER_BY_COLUMNS_OPTIONS)],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */

    public function messages()
    {
        return [
            'type.in' => 'O campo type deve conter um valor válido.',

            'category_id.integer' => 'O campo category_id deve ser um inteiro.',

            'name.string' => 'O campo name deve ser uma string.',
            'name.max' => 'O campo name deve ter no máximo ' . Transaction::NAME_MAX_LENGTH .  ' caracteres.',

            'order_by.string' => 'O campo order_by deve ser uma string.',
            'order_by.in' => 'O campo order_by deve conter um valor valido.',
        ];
    }
}
