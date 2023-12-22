'use client';

import { Menu } from '@prisma/client';
import { useState } from 'react';

const MenuPage = () => {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  return (
    <div>
      {menuList.length == 0 ? (
        <p className="m-auto my-5 text-lg">
          There is still no any menu. Please come back later.
        </p>
      ) : (
        menuList.map((menu) => (
          <div key={menu.id}>
            {/*<MenuItem
                menu={menu}
                
                handleCategoryRefetch={handleCategoryRefetch}
                handleCategoryEdit={handleCategoryEdit}
  />*/}
          </div>
        ))
      )}
    </div>
  );
};

export default MenuPage;
