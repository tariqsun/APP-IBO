import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import WhatsLink from '../../Shared/WhatsLink';
import moment from 'moment';

const Index = () => {
  const { customers } = usePage().props;
  const {
    data,
    meta: { links }
  } = customers;
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Customers</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('customers.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Customers</span>
        </InertiaLink>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
            <th className="px-6 pt-5 pb-4">Customer Id</th>
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">Joining Date</th>
              <th className="px-6 pt-5 pb-4">
                Phone
              </th>
              <th className="px-6 pt-5 pb-4">Status</th>
              <th className="px-6 pt-5 pb-4">Plan</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {data.map(({ id, customer_id, name, email, phone_number, start_date, status, plans, deleted_at, due_payment }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                  <InertiaLink
                    href={route('customers.edit', id)}
                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                  >
                    {customer_id}
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
                    tabIndex="1"
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    href={route('customers.edit', id)}
                  >
                    {name}
                  </InertiaLink>
                </td>
                <td className="border-t">

                        <InertiaLink
                            tabIndex="-1"
                            href={route('customers.edit', id)}
                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                        >
                            {moment(start_date).format('DD-MM-YYYY')}
                        </InertiaLink>

                </td>
                <td className="border-t">
                    {phone_number !== '' && phone_number != null?(
                        <a
                            target="_blank"
                            href={`tel:${phone_number}`}
                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                           >
                            {phone_number}
                        </a>
                    ):(
                        <InertiaLink
                            tabIndex="-1"
                            href={route('customers.edit', id)}
                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                        >
                            {phone_number}
                      </InertiaLink>
                    )}

                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="1"
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                    href={route('customers.edit', id)}
                  >
                    {status ? (
                        <span className='text-sm bg-green-600 text-gray-100 py-1 px-6 rounded-3xl'>Active</span>
                    ) : (
                        <span className='text-sm bg-red-600 text-gray-100 py-1 px-6 rounded-3xl '>Disactive</span>
                    )}
                  </InertiaLink>
                </td>
                <td className="border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('plans.edit', plans.id)}
                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                  >
                    {plans ? plans.name:''}
                  </InertiaLink>
                </td>
                <td className="border-t">
                    {due_payment.length > 0?(
                       <WhatsLink amount={due_payment[0].balance} contact={phone_number} due_date={due_payment[0].due_date} />
                    ):(
                        <span>No due payment found</span>
                    )}
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('customers.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                    <Icon
                      name="cheveron-right"
                      className="block w-6 h-6 text-gray-400 fill-current"
                    />
                  </InertiaLink>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </div>
  );
};

Index.layout = page => <Layout title="Customers" children={page} />;

export default Index;
