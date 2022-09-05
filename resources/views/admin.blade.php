<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin</title>
    <link rel="stylesheet" href="{{ $app_css }}" type='text/css' media='all' />
    <style>
        table td.first {
            border-top: 2px solid silver;
        }
    </style>
</head>
<body>

    <div style="max-width:700px;margin-top:20px;margin-left:auto;margin-right:auto;">

        {{ $uploads->links() }}

        <table class="table">
        @foreach($uploads as $upload)
            @foreach($upload->files as $file)
            <tr>
                <td
                    style="width:110px;"
                    @class([
                        'first' => $loop->index == 0,
                    ])
                    >
                    @if ($loop->index == 0)
                    {{ $upload->created_at->format('M j, Y H:i') }}
                    @endif
                </td>
                <td
                    @class([
                        'first' => $loop->index == 0,
                    ])
                ><a href="{{ $file->url }}" target="_blank">{{ $file->file_name }}</a></td>
                <td
                    @class([
                        'first' => $loop->index == 0,
                        'has-text-right',
                    ])
                >{{ $file->size_human }}</td>
            </tr>
            @endforeach
        @endforeach
        </table>

        {{ $uploads->links() }}

    </div>

    <script src="{{ $app_js }}"></script>
</body>
</html>
