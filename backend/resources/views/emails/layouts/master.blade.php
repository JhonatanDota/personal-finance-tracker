<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'Controle Financeiro')</title>

    <style>
        body {
            font-family: "Inter", Arial, sans-serif;
            background-color: #f3f4f6;
            color: #111827;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .email-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: #2545B5;
            color: #ffffff;
            text-align: center;
            padding: 24px;
            font-size: 22px;
            font-weight: bold;
        }

        .email-body {
            padding: 32px 24px;
            line-height: 1.6;
        }

        .email-body h2 {
            margin-top: 0;
            font-size: 20px;
            font-weight: 600;
        }

        .email-body p {
            margin: 12px 0;
        }

        .button-wrapper {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            background-color: #0F1385;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 8px;
            font-weight: 500;
            display: inline-block;
        }

        .email-footer {
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            padding: 16px;
            border-top: 1px solid #e5e7eb;
        }

        @media (max-width: 600px) {
            .email-body {
                padding: 24px 16px;
            }
        }
    </style>
</head>

<body>
    <div class="email-wrapper">
        <div class="email-header">
            Controle Financeiro
            @include('svgs.logo', ['width' => 32, 'height' => 32])
        </div>

        <div class="email-body">
            @yield('content')
        </div>

        <div class="email-footer">
            © {{ date('Y') }} Controle Financeiro. Todos os direitos reservados.
        </div>
    </div>
</body>

</html>
