<?php

namespace App\Http\Requests\Statistic;

use Illuminate\Foundation\Http\FormRequest;

class SummaryRequest extends FormRequest
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
        return [
            'date_ge' => ['sometimes', 'date'],
            'date_le' => ['sometimes', 'date'],
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
            'date_ge.date' => 'O campo date_ge deve ser uma data.',
            'date_le.date' => 'O campo date_le deve ser uma data.',
        ];
    }
}
