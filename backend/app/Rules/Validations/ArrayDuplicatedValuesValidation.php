<?php

namespace App\Rules\Validations;

use Illuminate\Contracts\Validation\Rule;

use App\Functions\Helpers;

class ArrayDuplicatedValuesValidation implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value): bool
    {
        if (!is_array($value)) {
            return true;
        }

        return !Helpers::arrayHasDuplicatedValues($value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message(): string
    {
        return 'The :attribute field has duplicated values.';
    }
}
