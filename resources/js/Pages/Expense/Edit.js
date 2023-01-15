import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import DeleteButton from '@/Shared/DeleteButton';

const Edit = () => {
    const { category, expense } = usePage().props;
    const { data, setData, errors, put, processing } = useForm({
        amount: expense.data.amount || '',
        category_id: expense.data.category_id || '',
        expens_date:expense.data.expens_date  || ''
    });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('expense.update', expense.data.id));
  }


  function destroy() {
    if (confirm('Are you sure you want to delete this expense?')) {
      Inertia.delete(route('expense.destroy', expense.data.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this expense?')) {
      Inertia.put(route('expense.restore', expense.data.id));
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('expense.create')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Expense
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> {data.amount}
      </h1>
      {expense.data.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This expense has been deleted.
        </TrashedMessage>
      )}
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
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!expense.data.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Expense</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Expense
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout title="Edit Expense" children={page} />;

export default Edit;
