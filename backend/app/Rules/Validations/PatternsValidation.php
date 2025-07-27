<?php

namespace App\Rules\Validations;

class PatternsValidation
{
    public const EMAIL_WITH_TLD = '/^[^@\s]+@[^@\s]+\.[^@\s]+$/';

    public const ONLY_DIGITS = '/^\d+$/';
}
