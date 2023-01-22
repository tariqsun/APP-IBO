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
import moment from 'moment/moment';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { customer, plans, } = usePage().props;
  const { data, setData, errors, put, processing } = useForm({
    name: customer.data.name || '',
    email: customer.data.email || '',
    status: customer.data.status.toString() || '',
    phone_number: customer.data.phone_number?.toString() || '',
    plan_id: customer.data.plan_id || '',
    address: customer.data.address || '',
    start_date: customer.data.start_date || '',
    customer_id: customer.data.customer_id || '',
    password: customer.data.password || '',
    discount: customer.data.discount || ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    put(route('customers.update', customer.data.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this contact?')) {
      Inertia.delete(route('customers.destroy', customer.data.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this contact?')) {
      Inertia.put(route('customers.restore', customer.data.id));
    }
  }

  return (
    <div>
      <Helmet title={`Customer ${data.name}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('customers')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Customers
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {customer.data.deleted_at && (
        <TrashedMessage onRestore={restore}>
          This customers has been deleted.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Customer Id"
              name="customer_id"
              errors={errors.customer_id}
              value={data.customer_id}
              onChange={e => setData('customer_id', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Password"
              name="Password"
              errors={errors.password}
              value={data.password}
              onChange={e => setData('password', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-full"
              label="Name"
              name="name"
              errors={errors.name}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
            />

            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Plan"
              name="plan_id"
              errors={errors.plan_id}
              value={data.plan_id}
              onChange={e => setData('plan_id', e.target.value)}
            >
              <option value="" hidden>Select Plan</option>
              {plans.data.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Discount"
              name="discount"
              type="discount"
              errors={errors.discount}
              value={data.discount}
              onChange={e => setData('discount', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Phone"
              name="phone_number"
              type="text"
              errors={errors.phone_number}
              value={data.phone_number}
              onChange={e => setData('phone_number', e.target.value)}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Address"
              name="address"
              type="text"
              errors={errors.address}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
            />
             <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Start Date"
              name="start_date"
              type="date"
              errors={errors.start_date}
              value={data.start_date}
              onChange={e => setData('start_date', e.target.value)}
            />

            <SelectInput
              className="w-full pb-8 pr-6 lg:w-full"
              label="Status"
              name="status"
              errors={errors.status}
              value={data.status}
              onChange={e => setData('status', e.target.value)}
            >
              <option value="" hidden>Select Status</option>
              <option value="1">Active</option>
              <option value="0">Disactive</option>
            </SelectInput>

          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!customer.data.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Contact</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Customer
            </LoadingButton>
          </div>
        </form>
      </div>
      <h2 className="mt-12 text-2xl font-bold">Payment History</h2>
      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Amount</th>
              <th className="px-6 pt-5 pb-4">From</th>
              <th className="px-6 pt-5 pb-4">To</th>
              <th className="px-6 pt-5 pb-4">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {customer.data.payments.map(
              ({ id, balance, start_date, due_date, created_at, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('customers.edit', customer.data.id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {balance}
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
                        href={route('customers.edit', customer.data.id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {moment(start_date).format('DD-MM-YYYY')}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('customers.edit', customer.data.id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {moment(due_date).format('DD-MM-YYYY')}
                      </InertiaLink>
                    </td>

                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('customers.edit', customer.data.id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {moment(created_at).format('DD-MM-YYYY')}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('customers.edit', customer.data.id)}
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
            {customer.data.payments.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
