import React, {
  useCallback,
  ChangeEvent,
  SetStateAction,
  memo,
  useState,
} from 'react';

export default memo(function AvatarFormItem({
  form,
  setForm,
}: {
  form: any;
  setForm: React.Dispatch<SetStateAction<any>>;
}) {
  const [preview, setPreview] = useState('');
  const setImageFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (fileList instanceof FileList) {
        const file = fileList[0];
        let fileReader = new FileReader();
        fileReader.onload = function () {
          setForm((prev: typeof form) => {
            return {
              ...prev,
              avatar: file,
            };
          });
          setPreview(fileReader.result as string);
          fileReader.onerror = function () {
            alert(fileReader.error);
          };
        };
        fileReader.readAsDataURL(file);
      }
    },
    [setForm]
  );

  return (
    <div className="form-group row mb-3">
      <label htmlFor="avatar" className="form-label">
        Avatar
      </label>
      <div className="col row">
        <input
          id="avatar"
          className="form-input form-control-file col"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          // value={form.avatar?}
          onChange={setImageFile}
        />

        {preview && (
          <div className="form-avatar-preview col">
            <p>preview</p>
            {/* <button className="btn btn-secondary">remove</button> */}
            <img
              className="rounded img-thumbnail"
              src={preview}
              alt="uploaded avatar"
              style={{ width: '300px' }}
            />
          </div>
        )}
      </div>
    </div>
  );
});
