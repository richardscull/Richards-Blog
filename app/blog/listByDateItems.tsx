"use client";
import Link from "next/link";
import { useState } from "react";

type Props = {
  setOpenYear: number;
  setOpenMonth: number;
  posts: Blogpost[];
};

export default function ListByDateItems({
  posts,
  setOpenMonth,
  setOpenYear,
}: Props) {
  const [openYears, setOpenYears] = useState<{ [year: number]: boolean }>({
    [setOpenYear]: true,
  });
  const [openMonths, setOpenMonths] = useState<{ [month: string]: boolean }>({
    [`${setOpenYear}-${setOpenMonth + 1}`]: true,
  });

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

  const PostsYears = posts
    .map((post) => new Date(post.date).getFullYear())
    .filter((year, index, self) => self.indexOf(year) === index);

  return (
    <>
      <nav>
        <ul className="text-1xl p-2 my-5 flex flex-col max-w-[280px]">
          <h1 className="first-letter:text-1xl font-bold max-w-full">
            Posts by date
          </h1>

          {PostsYears.map((year) => (
            <li key={year} className="mx-fit whitespace-normal text-right ">
              <details className="group" open={setOpenYear === year}>
                <summary
                  className="flex items-center justify-between gap-2 p-1 font-medium marker:content-none hover:cursor-pointer"
                  onClick={() => handleYearClick(year)}
                >
                  <h1>{year}</h1>
                  <span className="mdi mdi-chevron-right justify-end ml-32 transition group-open:rotate-90"></span>
                </summary>
              </details>

              {openYears[year] && (
                <ul className="block">
                  {getYearsMonths(year, posts).map((month) => (
                    <li
                      key={month}
                      className="-my-2 mx-fit whitespace-normal text-left"
                    >
                      <details className="group" open={setOpenYear === year && setOpenMonth+1 === month}>
                        <summary
                          className="flex items-center justify-between p-2 font-medium marker:content-none hover:cursor-pointer"
                          onClick={() =>
                            handleMonthClick(year, month.toString())
                          }
                        >
                          <h1 className="mx-2">{monthName(month)}</h1>
                          <span className="-mx-1 mdi mdi-chevron-right justify-center ml-32 transition group-open:rotate-90"></span>
                        </summary>
                      </details>
                      {openMonths[`${year}-${month}`] && (
                        <article className="px-4 pb-2 -py-2">
                          <ul className="flex flex-col gap-1 pl-2">
                            {getMonthsPosts(year, month, posts).map((post) => (
                              <li key={post.id}>
                                <Link href={`/blog/${post.id}`}>
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
      </nav>
    </>
  );
}

export function monthName(month: number): string {
  const getMonth = new Date(`2000-${month}-${month}`).toLocaleDateString(
    "ru-RU",
    {
      month: "long",
    }
  );
  return getMonth.charAt(0).toUpperCase() + getMonth.slice(1);
}

export function getYearsMonths(year: number, posts: Blogpost[]) {
  const PostsMonths = posts
    .filter((post) => new Date(post.date).getFullYear() === year)
    .map((post) => new Date(post.date).getMonth() + 1)
    .filter((month, index, self) => self.indexOf(month) === index)
    .sort();

  return PostsMonths;
}

export function getMonthsPosts(year: number, month: number, posts: Blogpost[]) {
  const PostsMonths = posts
    .filter((post) => new Date(post.date).getFullYear() === year)
    .filter((post) => new Date(post.date).getMonth() === month - 1)
    .map((post) => {
      return {
        id: post.id,
        title: post.title,
      };
    });

  return PostsMonths;
}
