import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleUserDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons
        .fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                fetch(`https://coffee-store-server-fawn-iota.vercel.app/users/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = users.filter(us => us._id != id);
                            setUsers(remaining);
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting item:", error);
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your item is safe :)",
                    icon: "error"
                });
            }
        });


    // Swal.fire({
    //     title: "Deleted",
    //     text:"Your data has been deleted",
    //     width: 600,
    //     padding: "3em",
    //     color: "#716add",
    //     background: "#fff url(/images/trees.png)",
    //     backdrop: `
    //       rgba(0,0,123,0.4)
    //       url("/images/nyan-cat.gif")
    //       left top
    //       no-repeat
    //     `
    //   });
  };
  return (
    <div>
      <h2 className="text-3xl">Users:{users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Last Login At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-base-200">
                <th>1</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.createAt}</td>
                <td>{user.lastSignInTime}</td>
                <td>
                  <button className="btn bg-slate-400 ">E</button>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="btn bg-slate-400 "
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
