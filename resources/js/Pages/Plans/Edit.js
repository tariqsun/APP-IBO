import React from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { plan } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: plan.data.name || '',
    status: plan.data.status.toString() || '',
    price: plan.data.price || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('plans.update', plan.data.id));
  }


  function destroy() {
    if (confirm('Are you sure you want to delete this plans?')) {
      Inertia.delete(route('plans.destroy', plan.data.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this plans?')) {
      Inertia.put(route('plans.restore', plan.data.id));
    }
  }

  return (
    <div>
        <Helmet title={data.name} />
        <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('plans')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Plans
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {plan.data.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This plans has been deleted.
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
                        label="Price"
                        name="price"
                        type="number"
                        errors={errors.price}
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        />
                     <SelectInput
                                className="w-full pb-8 pr-6 lg:w-full"
                                label="Status"
                                name="status"
                                errors={errors.status}
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                            <option value="" hidden></option>
                            <option value="1">Active</option>
                            <option value="0">Disactive</option>
                    </SelectInput>
                </div>
                <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
                    {!plan.data.deleted_at && (
                    <DeleteButton onDelete={destroy}>
                        Delete plan
                    </DeleteButton>
                    )}
                    <LoadingButton
                    loading={processing}
                    type="submit"
                    className="ml-auto btn-indigo"
                    >
                        Update Plan
                    </LoadingButton>
                </div>
            </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
