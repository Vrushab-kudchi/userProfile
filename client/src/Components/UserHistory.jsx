import React, { useEffect, useState } from 'react';
import '../Style/UserHistory.css';
import { history, getUserName, deleteHistory } from '../helper/helper';
import Navbar from './Navbar';

export default function UserHistory() {
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const { userId } = await getUserName();
      const { data } = await history(userId);
      setUserHistory(data);
    };
    getHistory();
  }, []);

  const handleDeleteClick = async (_id) => {
    await deleteHistory(_id);
    const updatedHistory = userHistory.filter((entry) => entry._id !== _id);
    setUserHistory(updatedHistory);
  };

  return (
    <>
      <Navbar />
      <div className="text-center text-3xl font-bold py-6">
        User History
      </div>
      <div className="flex justify-center">
        <div className="table-container">
          <table className="table">
            <thead >
              <tr>
                {/* <th className="table-cell first-cell">Message</th> */}
                <th className="table-cell" style={{backgroundColor: 'black', color: 'white'}}>Encrypted Text</th>
                <th className="table-cell" style={{backgroundColor: 'black', color: 'white'}}>Secret Key</th>
                <th className="table-cell last-cell" style={{backgroundColor: 'black', color: 'white'}}>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white '>
              {userHistory.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No user history found.
                  </td>
                </tr>
              ) : (
                userHistory.map((entry) => (
                  <tr key={entry._id} className="table-row">
                    {/* <td className="table-cell max-w-xs break-words">{entry.plainText}</td> */}
                    <td className="table-cell max-w-xs break-words">{entry.encryptedText}</td>
                    <td className="table-cell">{entry.secret_key}</td>
                    <td className="table-cell">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
                        onClick={() => handleDeleteClick(entry._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
