<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin</title>

</head>
<body>

    {{ $uploads->links() }}

    <table>
    @foreach($uploads as $upload)
        <tr>
            <td colspan="2">{{ $upload->created_at }}</td>
        </tr>
        @foreach($upload->files as $file)
        <tr>
            <td>{{ $file->id }}</td>
            <td>{{ $file->file_name }}</td>
        </tr>
        @endforeach
    @endforeach
    </table>

    {{ $uploads->links() }}

</body>
</html>
