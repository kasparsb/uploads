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
        <tr>
            <td style="width:110px;">
                {{ $upload->created_at->format('M j, Y H:i') }}<br />
                {{ $upload->ip }}<br />
                @if ($upload->ip_info)
                {{ json_encode($upload->ip_info) }}
                @endif
                @if ($upload->finished_at)
                <br />{{ $upload->finished_at->format('M j, Y H:i') }}
                @endif
            </td>
            <td>
                @if ($upload->meta)
                    @foreach ($upload->meta as $key => $value)
                    <b>{{ $key }}</b>
                    <div>
                        {{ $value }}
                    </div>
                    @endforeach
                @endif
            </td>
            <td>
                @foreach($upload->files as $file)
                <a href="{{ $file->url }}" target="_blank">{{ $file->file_name }}</a> {{ $file->size_human }}
                @endforeach
            </td>
        </tr>
        @endforeach
        </table>

        {{ $uploads->links() }}

    </div>

    <script src="{{ $app_js }}"></script>
</body>
</html>
