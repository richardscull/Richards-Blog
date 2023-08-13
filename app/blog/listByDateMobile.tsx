"use client";
import Link from "next/link";
import { useState } from "react";
import { getMonthsPosts, getYearsMonths, monthName } from "./listByDateItems";

type Props = {
  posts: Blogpost[];
  closeAllNav: () => void;
};

export default function ListByDateMobile({ posts, closeAllNav }: Props) {
  const [openYears, setOpenYears] = useState<{ [year: number]: boolean }>({});
  const [openMonths, setOpenMonths] = useState<{ [month: string]: boolean }>(
    {}
  );

  const handleYearClick = (year: number) => {
    setOpenYears((prevOpenYears) => ({
      ...prevOpenYears,
      [year]: !prevOpenYears[year],
    }));
  };
  const handleMonthClick = (year: number, month: string) => {
    setOpenMonths((prevOpenMonths) => ({
      ...prevOpenMonths,
      [`${year}-${month}`]: !prevOpenMonths[`${year}-${month}`],
    }));
  };

  return (
    <ul className="p-4 mx-auto">
      {posts
        .map((post) => new Date(post.date).getFullYear())
        .filter((year, index, self) => self.indexOf(year) === index)
        .map((year) => (
          <li key={year}>
            <details className="group">
              <summary
                className="flex items-center marker:content-none hover:cursor-pointer text-xl"
                onClick={() => handleYearClick(year)}
              >
                <div className="p-2">{year}</div>

                <span className="mdi mdi-chevron-right justify-end ml-36 transition group-open:rotate-90"></span>
              </summary>
            </details>

            {openYears[year] && (
              <ul className="block">
                {getYearsMonths(year, posts).map((month) => (
                  <li
                    key={month}
                    className="-my-2 mx-fit whitespace-normal text-left"
                  >
                    <details className="group">
                      <summary
                        className="flex items-center marker:content-none hover:cursor-pointer text-xl"
                        onClick={() => handleMonthClick(year, month.toString())}
                      >
                        <div className="p-2 mx-2">{monthName(month)}</div>
                        <span className="mdi mdi-chevron-right justify-center ml-28 transition group-open:rotate-90"></span>
                      </summary>
                    </details>
                    {openMonths[`${year}-${month}`] && (
                      <article className="px-4 pb-2 -py-2">
                        <ul className="flex flex-col gap-1 pl-2">
                          {getMonthsPosts(year, month, posts).map((post) => (
                            <li key={post.id} onClick={closeAllNav}>
                              <Link
                                href={`/blog/${post.id}`}
                                className="text-xl flex"
                              >
                                {post.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </article>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
    </ul>
  );
}
