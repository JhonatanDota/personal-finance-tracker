<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Transaction;

abstract class DefaultTransactionRequest extends FormRequest
{
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
        return [];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */

    public function messages()
    {
        return [
            'category_id.required' => 'O campo category_id é obrigatório.',
            'category_id.exists' => 'O valor informado para o campo category_id não existe.',
            'category_id.integer' => 'O campo category_id deve ser um inteiro.',

            'name.required' => 'O campo name é obrigatório.',
            'name.string' => 'O campo name deve ser uma string.',
            'name.min' => 'O campo name deve ter no mínimo ' . Transaction::NAME_MIN_LENGTH . ' caracteres.',
            'name.max' => 'O campo name deve ter no máximo ' . Transaction::NAME_MAX_LENGTH . ' caracteres.',

            'value.required' => 'O campo value é obrigatório.',
            'value.numeric' => 'O campo value deve ser um número.',
            'value.min' => 'O campo value deve ter no mínimo ' . Transaction::VALUE_MIN . '.',
            'value.max' => 'O campo value deve ter no máximo ' . Transaction::VALUE_MAX . '.',

            'description.required' => 'O campo description é obrigatório.',
            'description.string' => 'O campo description deve ser uma string.',
            'description.max' => 'O campo description deve ter no máximo ' . Transaction::DESCRIPTION_MAX_LENGTH . ' caracteres.',

            'date.required' => 'O campo date é obrigatório.',
            'date.date' => 'O campo date deve ser uma data.',
        ];
    }
}
