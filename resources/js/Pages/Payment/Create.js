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
  const { customers } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
        customer_id:'',
        balance: '',
        start_date:  '',
        due_date:  '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('payments.store'));
  }


  return (
    <div>
      <Helmet title={`Create Payment`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
            href={route('payments')}
            className="text-indigo-600 hover:text-indigo-700"
            >
          Payments
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/ Create</span>
      </h1>

      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
           <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Amount"
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

            >
              <option value="" hidden>Select Plan</option>
              {customers.data.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>

           </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">

            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Create Payment
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
