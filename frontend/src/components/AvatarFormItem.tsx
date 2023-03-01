import React, { useCallback, ChangeEvent, SetStateAction, memo } from 'react';

export default memo(function AvatarFormItem({
  form,
  setForm,
}: {
  form: any;
  setForm: React.Dispatch<SetStateAction<any>>;
}) {
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
              avatar: fileReader.result as string,
            };
          });

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
    <div className="form-item row mb-3">
      <label htmlFor="avatar" className="form-label col">
        Avatar
      </label>
      <input
        id="avatar"
        className="form-input form-control"
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        // value={form.avatar?}
        onChange={setImageFile}
      />
      {form.avatar && (
        <div className="form-avatar-preview">
          <p>preview</p>
          <img
            src={form.avatar}
            alt="uploaded avatar"
            style={{ width: '300px' }}
          />
        </div>
      )}
    </div>
  );
});
