<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

use App\Rules\Fields\Commom\EmailRules;
use App\Rules\Fields\User\PasswordRules;
use App\Rules\Validations\PatternsValidation;

class ResetPasswordRequest extends FormRequest
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
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'max:' . EmailRules::MAX_LENGTH, 'regex:' . PatternsValidation::EMAIL_WITH_TLD],
            'password' => ['required', 'string', 'min:' . PasswordRules::MIN_LENGTH, 'max:' . PasswordRules::MAX_LENGTH, 'confirmed']
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

            'token.string' => 'O token informado é inválido.',
            'token.required' => 'O campo token é obrigatório.',

            'password.required' => 'O campo password é obrigatório.',
            'password.string' => 'O campo password deve ser uma string.',
            'password.min' => 'O campo password deve ter no mínimo ' . PasswordRules::MIN_LENGTH . ' caracteres.',
            'password.max' => 'O campo password deve ter no máximo ' . PasswordRules::MAX_LENGTH . ' caracteres.',
            'password.confirmed' => 'Os campos password e password_confirmation devem ser iguais.',
        ];
    }
}
