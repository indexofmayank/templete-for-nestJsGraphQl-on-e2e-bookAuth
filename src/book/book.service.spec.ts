import { Model } from "mongoose";
import { BookService } from "./book.service"
import { Book } from "./schemas/book.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";


describe('BookService', () => {

    let bookService: BookService;
    let model: Model<Book>;

    const mocBook = {
        "_id": "64c0f82e6939a74a9ed99c29",
        "title": "mayank ka book",
        "description": "mayank ka description",
        "author": "mayank",
        "price": 2021,
        "category": "Shopify",
        "user": "64c0f53c393130d587e6ffaa",
    };

    const mocUser = {
        _id: '64c0f53c393130d587e6ffaa',
        name: 'Ghulam',
        email: 'ghulam1@gmail.com'
    };

    const mockBookService = {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken(Book.name),
                    useValue: mockBookService,
                }
            ],
        }).compile();

        bookService = module.get<BookService>(BookService);
        model = module.get<Model<Book>>(getModelToken(Book.name));
    });

    describe('findById', () => {
        it('should find and return a book by ID',  () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mocBook._id);

            const result = await bookService.findById(mocBook._id);
            console.log(result)
            expect(model.findById).toHaveBeenCalledWith(mocBook._id);
            expect(result).toEqual(mocBook);
        })
    })
});