import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage, useForm } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { plans } = usePage().props;
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    email: '',
    status: '',
    phone_number: '',
    plan_id: '',
    address: '',
    start_date: '',
    customer_id: '',
    password: '',
    discount: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('customers.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('customers')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Customers
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
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
              className="w-full pb-8 pr-6 lg:w-full"
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
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Customer
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Customer" children={page} />;

export default Create;
