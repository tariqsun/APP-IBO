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

const Edit = () => {
  const { payment, customers } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
        customer_id: payment.data.customer_id || '',
        balance: payment.data.balance || '',
        start_date: payment.data.start_date || '',
        due_date: payment.data.due_date || '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('payments.update', payment.data.id));
  }


  return (
    <div>
      <Helmet title={`Edit Payment ${data.customer_id}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
            href={route('payments')}
            className="text-indigo-600 hover:text-indigo-700"
            >
          Payments
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.customer_id}
      </h1>

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
           <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Due Amount"
              name="balance"
              errors={errors.balance}
              value={data.balance}
              type="number"
              onChange={e => setData('balance', e.target.value)}
            />


            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Customer"
              name="customer_id"
              errors={errors.customer_id}
              value={data.customer_id}
              onChange={e => setData('customer_id', e.target.value)}
              disabled
            >
              <option value="" hidden>Select Plan</option>
              {customers.data.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>

             <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Start Date"
              name="start_date"
              type="date"
              errors={errors.start_date}
              value={data.start_date}
              onChange={e => setData('start_date', e.target.value)}
            />
             <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Due Date"
              name="due_date"
              type="date"
              errors={errors.due_date}
              value={data.due_date}
              onChange={e => setData('due_date', e.target.value)}
            />



           </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">

            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Payment
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
