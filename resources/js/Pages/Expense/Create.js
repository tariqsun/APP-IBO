import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
    const { category } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        category_id: '',
        expens_date:''
    });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('expense.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('expense.category')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Expense
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Amount"
              name="amount"
              errors={errors.amount}
              value={data.amount}
              type="number"
              onChange={e => setData('amount', e.target.value)}
            />

            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Category"
              name="category_id"
              errors={errors.category_id}
              value={data.category_id}
              onChange={e => setData('category_id', e.target.value)}
            >
              {category.data.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>

            <TextInput
                    className="w-full pb-8 pr-6"
                    label="Date"
                    name="expens_date"
                    errors={errors.expens_date}
                    value={data.expens_date}
                    type="date"
                    onChange={e => setData('expens_date', e.target.value)}
                />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Expense
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Expense" children={page} />;

export default Create;
