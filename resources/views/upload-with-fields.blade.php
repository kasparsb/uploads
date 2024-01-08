<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload</title>
    <link rel="stylesheet" href="{{ $app_css }}" type='text/css' media='all' />
    <link rel="stylesheet" href="{{ $filepicker_css }}" type='text/css' media='all' />
</head>
<body>

    <div class="app">

        <div class="upload-description">
            <textarea name="upload_description"></textarea>
        </div>

        <div class="file-picker">
            <label>
                <input type="file" name="file" multiple />

                Pievieno failus
            </label>

            <div class="file-picker__dragover">
                Nomet failus šeit
            </div>

            <ul class="file-picker__file-list"></ul>
        </div>

        <div class="success">
            Paldies, Jūsu ziņojums ir saņemts!
        </div>

        <div class="startupload">
            <button name="startupload">Upload</button>
        </div>

    </div>

    <script src="{{ $filepicker_js }}"></script>
    <script>
        webit.default(document.querySelector('.file-picker'), {
            uploadUrl: '{{ $uploadUrl }}',
            metaFields: [
                {
                    name: 'description',
                    getValue: function(){
                        return document.querySelector('[name=upload_description]').value
                    },
                    clear: function(){
                        document.querySelector('[name=upload_description]').value = '';
                    }
                }
            ],
            onSuccess: function(){
                document.querySelector('.app').classList.add('app--success');
            },
            clearSuccess: function() {
                document.querySelector('.app').classList.remove('app--success');
            },
            submitButton: document.querySelector('[name=startupload]')
        })
    </script>
</body>
</html>
