import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import DeleteButton from '@/Shared/DeleteButton';
import TextInput from '@/Shared/TextInput';
import TrashedMessage from '@/Shared/TrashedMessage';


const Edit = () => {
 const { panel } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: panel.data.name || '',
    message: panel.data.message || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('panels.update', panel.data.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this panels?')) {
      Inertia.delete(route('panels.destroy', panel.data.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this panels?')) {
      Inertia.put(route('panels.restore', panel.data.id));
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('panels')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Panels
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}

      </h1>

      {panel.data.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This panel has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Name"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Message"
              name="message"
              type="text"
              errors={errors.message}
              value={data.message}
              onChange={e => setData('message', e.target.value)}
            />
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!panel.data.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Panel</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Panel
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout title="Edit Penel" children={page} />;

export default Edit;
