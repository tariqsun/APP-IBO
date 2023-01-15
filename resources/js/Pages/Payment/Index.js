import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import SearchFilter from '@/Shared/SearchFilter';
import WhatsLink from '../../Shared/WhatsLink';
import DateDiff from '../../Shared/DateDiff';
import moment from 'moment';

const Index = () => {
  const { payments } = usePage().props;
  const {
    data,
    meta: { links }
  } = payments;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Payments</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <InertiaLink
          className="btn-indigo focus:outline-none"
          href={route('payments.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Payments</span>
        </InertiaLink>
      </div>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">Due Amount</th>
              <th className="px-6 pt-5 pb-4">Start At</th>
              <th className="px-6 pt-5 pb-4">Due Date</th>
              <th className="px-6 pt-5 pb-4">Left In</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, balance, start_date, due_date, customer,  deleted_at }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 focus-within:bg-gray-100"
              >
                <td className="border-t">
                    {customer?(
                        <InertiaLink
                            href={route('payments.edit', id)}
                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                        >
                            {customer?customer.name:''}
                            {deleted_at && (
                            <Icon
                                name="trash"
                                className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                            />
                            )}
                        </InertiaLink>
                    ):(
                        <span
                         className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                        >Customer Not Found</span>
                    )}

                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                   {balance}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                   {moment(start_date).format('DD-MM-YYYY')}
                  </InertiaLink>
                </td>
                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                   {moment(due_date).format('DD-MM-YYYY')}
                  </InertiaLink>
                </td>

                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
                    className="flex items-center px-4 focus:outline-none"
                  >
                    <DateDiff  to={due_date} />
                  </InertiaLink>
                </td>
                <td className="border-t">
                    <WhatsLink amount="1000" contact="0232" due_date="0322" />
                </td>

                <td className="w-px border-t">
                  <InertiaLink
                    tabIndex="-1"
                    href={route('payments.edit', id)}
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
                  No plans found.
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

Index.layout = page => <Layout title="Payments" children={page} />;

export default Index;
