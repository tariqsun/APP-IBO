import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import DeleteButton from '@/Shared/DeleteButton';
import TextInput from '@/Shared/TextInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import SelectInput from '@/Shared/SelectInput';
import Icon from '@/Shared/Icon';


const Edit = () => {
 const { category } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: category.data.name || '',
    status: category.data.status.toString() || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('expense.category.update', category.data.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this expense category?')) {
      Inertia.delete(route('expense.category.destroy', category.data.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this expense category?')) {
      Inertia.put(route('expense.category.restore', category.data.id));
    }
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
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}

      </h1>

      {category.data.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This expense category has been deleted.
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
             <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
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
            {!category.data.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Expense Category</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Expense Category
            </LoadingButton>
          </div>
        </form>
      </div>
      <h2 className="mt-12 text-2xl font-bold">Expense</h2>
      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Amount</th>
              <th className="px-6 pt-5 pb-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {category.data.expense.map(
              ({ id, expens_date, amount, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('expense.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {amount}
                        {deleted_at && (
                          <Icon
                            name="trash"
                            className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                          />
                        )}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('expense.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {expens_date}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('expense.edit', id)}
                        className="flex items-center px-4"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </InertiaLink>
                    </td>
                  </tr>
                );
              }
            )}
            {category.data.expense.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No expense found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout title="Edit Expense Category" children={page} />;

export default Edit;
