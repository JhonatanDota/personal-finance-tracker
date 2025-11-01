<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\Fields\Commom\EmailRules;
use App\Rules\Validations\PatternsValidation;

class ForgotPasswordRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:' . EmailRules::MAX_LENGTH, 'regex:' . PatternsValidation::EMAIL_WITH_TLD],
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
            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O email informado é inválido.',
            'email.max' => 'O email informado é muito longo.',
            'email.regex' => 'O email informado é inválido.',
        ];
    }
}
