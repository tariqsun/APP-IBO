import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    status: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('expense.category.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('expense.category')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Expense Category
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
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

            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Status"
              name="status"
              errors={errors.status}
              value={data.country}
              onChange={e => setData('status', e.target.value)}
            >
              <option value="" hidden></option>
              <option value="1">Active</option>
              <option value="0">Disactive</option>
            </SelectInput>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Expense Category
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Expense Category" children={page} />;

export default Create;
